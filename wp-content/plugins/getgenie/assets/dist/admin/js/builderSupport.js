(() => {
  // assets/src/admin/js/AdvanceWriting/Callbacks.js
  var { __ } = wp.i18n;
  var Callbacks = {
    calculateEventPosition: (e, dependency) => {
      if (dependency === "viewport") {
        return e.target.getBoundingClientRect();
      }
      if (dependency === "body") {
        let getOffset = function(elem, type) {
          var offset = 0;
          do {
            if (!isNaN(elem?.["offset" + type])) {
              offset += elem?.["offset" + type];
            }
          } while (elem = elem?.offsetParent);
          return offset;
        };
        let eventPosition = {
          "top": getOffset(e.target, "Top"),
          "left": getOffset(e.target, "Left"),
          "right": getOffset(e.target, "Right"),
          "bottom": getOffset(e.target, "Bottom"),
          "width": e.target.getBoundingClientRect().width,
          "height": e.target.getBoundingClientRect().height
        };
        return eventPosition;
      }
    },
    insertContextMenu: (buttonEvent) => {
      let open = !wp.data.select("getgenie").contextMenu().open;
      wp.data.dispatch("getgenie").setContextMenu({
        open,
        buttonEvent
      });
    },
    showSidebar: (template) => {
      let context = wp.data.select("getgenie").sidebar().existingInputValue || "";
      let component = "WriteTemplatesScreen";
      let sentences = context.split(/[.!?]+\s/).filter(Boolean).length;
      let currentTemplate = template.slug;
      if (currentTemplate === "list") {
        component = "TemplateListScreen";
      }
      wp.data.dispatch("getgenie").setContextMenu({
        open: false
      });
      wp.data.dispatch("getgenie").setSidebar({
        open: true,
        currentWritingMode: template?.mode,
        component,
        currentTemplate,
        existingInputValue: context.replace(/<br\s*[\/]?>/g, "")
      });
    }
  };
  var Callbacks_default = Callbacks;

  // assets/src/admin/js/script-handler.js
  var imageUrl = `${window.getGenie.config.assetsUrl}dist/admin/images/genie-dark.svg`;
  var ScriptHandler = class {
    triggerBtnHtml = (classes, item) => {
      const button = document.createElement("button");
      let computedStyle = window.getComputedStyle(item);
      const paddingBottom = parseInt(computedStyle.paddingBottom) || 0;
      const marginBottom = parseInt(computedStyle.marginBottom) || 0;
      const borderBottom = parseInt(computedStyle.borderBottomWidth) || 0;
      image.style.top = `-${marginBottom + borderBottom + paddingBottom + 38}px`;
      button.classList.add("getgenie-trigger-btn", classes);
      button.innerHTML = `<img src=${imageUrl} alt="GetGenie" />`;
      return button;
    };
    checkVisibility = (item) => {
      let computedStyle = window.getComputedStyle(item);
      const display = computedStyle.display;
      const visibility = computedStyle.visibility;
      if (display === "none" || visibility === "hidden") {
        return false;
      }
      return true;
    };
    addGetGenieTriggerBtn = (container, isContainer = true) => {
      if (!container)
        return;
      setTimeout(() => {
        const mceContainer = jQuery(container).find(".mce-container");
        if (mceContainer?.length) {
          if (this.checkVisibility(mceContainer[0])) {
            if (mceContainer.parent().find(".bricks-textarea").length) {
              mceContainer.parent().find(".bricks-textarea").remove();
            }
            const mceIframe = mceContainer.find("iframe");
            mceIframe[0].insertAdjacentElement("afterend", this.triggerBtnHtml("bricks-textarea", mceIframe[0]));
          }
          const textarea2 = mceContainer.parent().find("textarea");
          if (!textarea2?.length || !this.checkVisibility(textarea2[0]))
            return;
          if (textarea2.parent().find(".bricks-textarea").length) {
            textarea2.parent().find(".bricks-textarea").remove();
            textarea2[0].insertAdjacentElement("afterend", this.triggerBtnHtml("bricks-textarea", textarea2[0]));
          }
        }
      }, 500);
      const textarea = jQuery(container).find("textarea");
      if (!textarea?.length)
        return;
      if (!textarea.parent().find(".bricks-textarea").length) {
        textarea.each((index, item) => {
          if (!this.checkVisibility(item))
            return;
          item.insertAdjacentElement("afterend", this.triggerBtnHtml("bricks-textarea", item));
        });
      }
    };
    insertTextToInputs = (value, field) => {
      const content = value.replace(/<br\s*[\/]?>/g, "\n");
      let event = new KeyboardEvent("keydown", {
        "key": "Shift",
        bubbles: true,
        cancelable: true
      });
      if (jQuery(field).parent().attr("id") === "tinymce" && wp.data.select("getgenie").sidebar().currentTemplate === "expandOutline") {
        field.insertAdjacentHTML("afterend", `<p>${content}</p>`);
      } else if (["INPUT", "TEXTAREA"].includes(field?.tagName)) {
        field.value = content;
      } else {
        field.innerText = content;
      }
      field.dispatchEvent(event);
    };
    contextMenuCallback = {
      continueWriting: (data, insertField, { beforeCaret, selectedText, afterCaret }) => {
        let updatedData = data;
        if (selectedText[selectedText?.length - 1] !== " ") {
          updatedData = " " + updatedData;
        }
        this.insertTextToInputs(beforeCaret + selectedText + updatedData + afterCaret, insertField);
      },
      expandOutline: (data, insertField, { beforeCaret, selectedText, afterCaret }) => {
        let finalText;
        if (jQuery(insertField).parent().attr("id") === "tinymce") {
          finalText = data;
        } else {
          finalText = beforeCaret + selectedText + " " + data + "\n" + afterCaret;
        }
        this.insertTextToInputs(finalText, insertField);
      },
      rewrite: (data, insertField, { beforeCaret, afterCaret }) => {
        let finalText = beforeCaret;
        if (beforeCaret) {
          finalText += " ";
        }
        finalText += data + " " + afterCaret;
        this.insertTextToInputs(finalText, insertField);
      }
    };
    genieHeadClickHandler = () => {
      jQuery(document).on("click", ".getgenie-trigger-btn", function(e) {
        e.preventDefault();
        let field = jQuery(this).siblings("textarea").length ? jQuery(this).siblings("textarea") : jQuery(this).siblings("iframe");
        if (field.length == 0) {
          return;
        }
        let value = field[0]?.value;
        field = field?.[0];
        let beforeCaret = (value || "").substring(0, field?.selectionStart);
        let afterCaret = (value || "").substring(field?.selectionEnd);
        let selectionStart, selectionEnd, docSelection = window.getSelection();
        let selectedText = docSelection.toString();
        let tagName = field.tagName.toLowerCase();
        if (tagName == "iframe") {
          const iframeWindow = field.contentWindow;
          const iframeDocument = iframeWindow.document;
          jQuery(iframeDocument).on("click", function(e2) {
            e2.preventDefault();
            if (wp.data.select("getgenie").contextMenu()?.open) {
              wp.data.dispatch("getgenie").setContextMenu({
                open: false
              });
            }
          });
          const iframeBody = iframeDocument.querySelector("body :first-child");
          docSelection = iframeWindow.document.getSelection();
          selectedText = docSelection.toString();
          if (docSelection?.focusNode) {
            field = docSelection.focusNode.parentNode;
            value = field.innerText;
            selectionStart = Math.min(docSelection?.focusOffset, docSelection?.baseOffset);
            selectionEnd = Math.max(docSelection?.focusOffset, docSelection?.baseOffset);
            beforeCaret = value.substring(0, selectionStart);
            afterCaret = value.substring(selectionEnd);
          }
          if (!iframeBody) {
            let newPara = iframeDocument.createElement("p");
            newPara.innerText = value;
            iframeDocument.querySelector("body").appendChild(newPara);
            return;
          }
        }
        let eventPosition = Callbacks_default.calculateEventPosition(e, "viewport");
        Callbacks_default.insertContextMenu(eventPosition);
        if (!docSelection?.focusNode) {
          return;
        }
        wp.data.dispatch("getgenie").setSidebar({
          insertTextCallback: insertTextToInputs,
          insertTextField: field,
          existingInputValue: selectedText
        });
        wp.data.dispatch("getgenie").setContextMenu({
          inputContent: {
            beforeCaret,
            selectedText,
            afterCaret
          },
          insertionField: field,
          contextMenuCallback: this.contextMenuCallback
        });
      });
    };
    tmceBtnClickHandler = (Callbacks2, container) => {
      if (document.querySelector("#content-tmce")) {
        document.querySelector("#content-tmce").addEventListener("click", function() {
          Callbacks2(container);
        });
        document.querySelector("#content-html").addEventListener("click", function() {
          Callbacks2(container);
        });
      }
    };
    cptScriptHandler = (id) => {
      this.genieHeadClickHandler();
      this.tmceBtnClickHandler(this.addGetGenieTriggerBtn, document.querySelector(`#${id}`));
    };
  };

  // assets/src/admin/js/bricks-builder.js
  var logo = `${window.getGenie.config.assetsUrl}dist/admin/images/genie-dark.svg`;
  var scriptHandler = new ScriptHandler();
  jQuery(document).ready(function($) {
    const triggerBtnHtml = (classes, item) => {
      const button = document.createElement("button");
      let computedStyle = window.getComputedStyle(item);
      const paddingBottom = parseInt(computedStyle.paddingBottom) || 0;
      const marginBottom = parseInt(computedStyle.marginBottom) || 0;
      const borderBottom = parseInt(computedStyle.borderBottomWidth) || 0;
      button.classList.add("getgenie-trigger-btn", classes);
      button.innerHTML = `<img src=${logo} alt="GetGenie" />`;
      return button;
    };
    const checkVisibility = (item) => {
      let computedStyle = window.getComputedStyle(item);
      const display = computedStyle.display;
      const visibility = computedStyle.visibility;
      if (display === "none" || visibility === "hidden") {
        return false;
      }
      return true;
    };
    const addGetGenieTriggerBtn = (container) => {
      if (!container)
        return;
      setTimeout(() => {
        const mceContainer = jQuery(container).find(".mce-container");
        if (mceContainer?.length) {
          if (checkVisibility(mceContainer[0])) {
            if (mceContainer.parent().find(".bricks-textarea").length) {
              mceContainer.parent().find(".bricks-textarea").remove();
            }
            const mceIframe = mceContainer.find("iframe");
            mceIframe[0].insertAdjacentElement("afterend", triggerBtnHtml("bricks-textarea", mceIframe[0]));
          }
          const textarea2 = mceContainer.parent().find("textarea");
          if (!textarea2?.length || !checkVisibility(textarea2[0]))
            return;
          if (textarea2.parent().find(".bricks-textarea").length) {
            textarea2.parent().find(".bricks-textarea").remove();
            textarea2[0].insertAdjacentElement("afterend", triggerBtnHtml("bricks-textarea", textarea2[0]));
          }
        }
      }, 500);
      const textarea = jQuery(container).find("textarea");
      if (!textarea?.length)
        return;
      if (!textarea.parent().find(".bricks-textarea").length) {
        textarea.each((index, item) => {
          if (!checkVisibility(item))
            return;
          item.insertAdjacentElement("afterend", triggerBtnHtml("bricks-textarea", item));
        });
      }
    };
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var observer = new MutationObserver(function(mutations, observer2) {
      for (let mutation of mutations) {
        addGetGenieTriggerBtn(parent.document.getElementById("bricks-panel"));
        if (wp.data.select("getgenie").contextMenu()?.open) {
          wp.data.dispatch("getgenie").setContextMenu({
            open: false
          });
        }
      }
    });
    observer.observe(document, {
      subtree: true,
      attributeFilter: ["class"],
      attributes: true
    });
    jQuery(document).on("click", ".getgenie-trigger-btn", function(e) {
      e.preventDefault();
      let field = jQuery(this).siblings("textarea").length ? jQuery(this).siblings("textarea") : jQuery(this).siblings("iframe");
      if (field.length == 0) {
        return;
      }
      let value = field[0]?.value;
      field = field?.[0];
      let beforeCaret = (value || "").substring(0, field?.selectionStart);
      let afterCaret = (value || "").substring(field?.selectionEnd);
      let selectionStart, selectionEnd, docSelection = window.getSelection();
      let selectedText = docSelection.toString();
      let tagName = field.tagName.toLowerCase();
      if (tagName == "iframe") {
        const iframeWindow = field.contentWindow;
        const iframeDocument = iframeWindow.document;
        jQuery(iframeDocument).on("click", function(e2) {
          e2.preventDefault();
          if (wp.data.select("getgenie").contextMenu()?.open) {
            wp.data.dispatch("getgenie").setContextMenu({
              open: false
            });
          }
        });
        const iframeBody = iframeDocument.querySelector("body :first-child");
        docSelection = iframeWindow.document.getSelection();
        selectedText = docSelection.toString();
        if (docSelection?.focusNode) {
          field = docSelection.focusNode.parentNode;
          value = field.innerText;
          selectionStart = Math.min(docSelection?.focusOffset, docSelection?.baseOffset);
          selectionEnd = Math.max(docSelection?.focusOffset, docSelection?.baseOffset);
          beforeCaret = value.substring(0, selectionStart);
          afterCaret = value.substring(selectionEnd);
        }
        if (!iframeBody) {
          let newPara = iframeDocument.createElement("p");
          newPara.innerText = value;
          iframeDocument.querySelector("body").appendChild(newPara);
          return;
        }
      }
      let eventPosition = Callbacks_default.calculateEventPosition(e, "viewport");
      Callbacks_default.insertContextMenu(eventPosition);
      if (!docSelection?.focusNode) {
        return;
      }
      wp.data.dispatch("getgenie").setSidebar({
        insertTextCallback: insertTextToInputs,
        insertTextField: field,
        existingInputValue: selectedText
      });
      wp.data.dispatch("getgenie").setContextMenu({
        inputContent: {
          beforeCaret,
          selectedText,
          afterCaret
        },
        insertionField: field,
        contextMenuCallback: {
          continueWriting: (data, insertField, { beforeCaret: beforeCaret2, selectedText: selectedText2 }) => {
            let updatedData = data;
            if (selectedText2[selectedText2?.length - 1] !== " ") {
              updatedData = " " + updatedData;
            }
            insertTextToInputs(beforeCaret2 + selectedText2 + updatedData, insertField);
          },
          expandOutline: (data, insertField, { beforeCaret: beforeCaret2, selectedText: selectedText2 }) => {
            const finalText = beforeCaret2 + selectedText2 + "\n" + data;
            insertTextToInputs(finalText, insertField);
          },
          rewrite: (data, insertField, { beforeCaret: beforeCaret2, afterCaret: afterCaret2 }) => {
            let finalText = beforeCaret2;
            if (beforeCaret2) {
              finalText += " ";
            }
            finalText += data + " " + afterCaret2;
            insertTextToInputs(finalText, insertField);
          }
        }
      });
    });
  });
})();
