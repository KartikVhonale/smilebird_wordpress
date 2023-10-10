<?php

namespace GenieAi\App\Providers;

class EnqueueProvider
{

	public function __construct()
	{
		add_action('init', function () {
			if (!is_user_logged_in() || !current_user_can('publish_posts')) {
				return;
			}

			add_action('admin_enqueue_scripts', [$this, 'load_react']);

			add_action('enqueue_block_editor_assets', [$this, 'addEnqueue']);
			add_action('admin_enqueue_scripts', [$this, 'addEnqueue']);

			add_action('admin_enqueue_scripts', [$this, 'globalScripts']);
			add_action('elementor/editor/after_enqueue_scripts', [$this, 'addEnqueue']);
			add_action('wp_enqueue_scripts', [$this, 'builderSupport']);
			add_action('elementor/editor/after_enqueue_scripts', [$this, 'elementorEditorStyle']);

			add_action('admin_print_scripts-post-new.php', [$this, 'cpt_admin_script']);
			add_action('admin_print_scripts-post.php', [$this, 'cpt_admin_script']);
			add_action('current_screen', [$this, 'check_current_screen']);
		});
	}

	function check_current_screen()
	{
		// Get the current screen object
		$current_screen = get_current_screen();
		$editor_option = get_option('classic-editor-replace');
		$action = !empty($_REQUEST['action']) ? $_REQUEST['action'] : '';

		// Check if the screen is for editing or adding a page or product post type
		if (in_array($current_screen->post_type, ['page', 'post', 'product'])) {
			// Check if the classic editor is being used
			if (function_exists('is_plugin_active') && is_plugin_active('classic-editor/classic-editor.php') && $editor_option !== 'block' && $action !== 'elementor') {
				// add action to 'media_buttons' hook and showWPEditorButtons
				add_action('media_buttons', [$this, 'showWPEditorButtons'], 100);
			}
		}
	}

	public function load_react()
	{
		global $wp_scripts;

		if (false == $wp_scripts->queue) {
			return;
		}

		foreach ($wp_scripts->queue as $handle) {
			$obj = $wp_scripts->registered[$handle];
			$name = $obj->handle;
			$version = $obj->ver;

			if (in_array($name, ['react', 'react-dom'])) {

				if (version_compare($version, "16.80.0", "<=")) {
					$react_version = '17.0.2';
					wp_dequeue_script('react');
					wp_dequeue_script('react-dom');
					wp_deregister_script('react');
					wp_deregister_script('react-dom');

					wp_enqueue_script('react', get_site_url() . '/wp-includes/js/dist/vendor/react.min.js', [], $react_version, true);
					wp_enqueue_script('react-dom', get_site_url() . '/wp-includes/js/dist/vendor/react-dom.min.js', ['react'], $react_version, true);
				}
				return;
			}
		}
	}

	public function addEnqueue()
	{

		$current_screen = get_current_screen();

		if (is_admin()) {

			wp_enqueue_script('getgenie-antd-scripts', GETGENIE_URL . 'assets/dist/admin/js/antd.js', ['wp-plugins', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);

			wp_enqueue_script('getgenie-handler-scripts', GETGENIE_URL . 'assets/dist/admin/js/app-handler.js', ['wp-plugins', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);
			wp_enqueue_script('getgenie-common-scripts', GETGENIE_URL . 'assets/dist/admin/js/common-scripts.js', ['wp-plugins', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);
			wp_enqueue_script('getgenie-templates-scripts', GETGENIE_URL . 'assets/dist/admin/js/templates-scripts.js', ['wp-plugins', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);

			// if (isset($_GET['page']) && $_GET['page'] == 'fluentcrm-admin') {
      //           wp_enqueue_script('getgenie-fluent-scripts', GETGENIE_URL . 'assets/dist/admin/js/fluent-crm.js', ['wp-plugins', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);
      //       }

			$elementor_action = isset($_GET['action']) && $_GET['action'] == 'elementor';

			if (
				$current_screen->id == 'product'
				&& $current_screen->base == 'post'
				&& $current_screen->post_type == 'product'
			) {
				wp_enqueue_script('getgenie-woo-wizard-scripts', GETGENIE_URL . 'assets/dist/admin/js/woo-wizard.js', ['wp-plugins', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);
			}

			if ($current_screen->id == 'toplevel_page_getgenie') {
				wp_enqueue_script('getgenie-admin-pages-scripts', GETGENIE_URL . 'assets/dist/admin/js/wp-admin-pages.js', ['wp-plugins', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);
			}
			if (($current_screen->is_block_editor() || ($current_screen->id == 'post'
				&& $current_screen->base == 'post'
				&& $current_screen->post_type == 'post'
			)) && !$elementor_action) {
				wp_enqueue_script('getgenie-blog-wizard-scripts', GETGENIE_URL . 'assets/dist/admin/js/blog-wizard.js', ['wp-plugins', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);
			}
			wp_enqueue_script('getgenie-admin-scripts', GETGENIE_URL . 'assets/dist/admin/js/wp-integrations.js', ['wp-plugins', 'wp-edit-post', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);
			wp_enqueue_style('getgenie-fonts-style', GETGENIE_URL . 'assets/dist/admin/styles/wp-font-family.css', [], GETGENIE_VERSION);
		}
	}

	public function globalScripts()
	{
		wp_enqueue_style('getgenie-icon-style', GETGENIE_URL . 'assets/dist/admin/styles/icon-pack.css', [], GETGENIE_VERSION);
		wp_enqueue_style('getgenie-admin-global-style', GETGENIE_URL . 'assets/dist/admin/styles/global.css', [], GETGENIE_VERSION);
	}

	public function elementorEditorStyle()
	{
		wp_enqueue_style('getgenie-editor-style', GETGENIE_URL . 'assets/dist/admin/styles/builder.css', [], GETGENIE_VERSION);
	}

	function cpt_admin_script()
	{

		wp_enqueue_style('getgenie-editor-style-cpt', GETGENIE_URL . 'assets/dist/admin/styles/builder.css', [], GETGENIE_VERSION);
		wp_enqueue_script('getgenie-loadBtn-cpt', GETGENIE_URL . 'assets/dist/admin/js/cptLoadBtn.js', ['wp-plugins', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);
	}

	function showWPEditorButtons($post)
	{
?>
		<span class="getgenie-button-container">
			<button id="genie-head-cpt" class="getgenie-head-classicEditor getgenie-trigger-btn"> <img src="<?php echo GETGENIE_URL . 'assets/dist/admin/images/genie-dark.svg' ?>" alt=""> GetGenie</button>
			<div id="getgenie-editor-custom-toolbar" class="getgenie classic classic-editor-score-btn"></div>
		</span>
<?php
	}

	function enqueueScript()
	{
		wp_enqueue_script('getgenie-antd-scripts', GETGENIE_URL . 'assets/dist/admin/js/antd.js', ['wp-plugins', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);
		wp_enqueue_script('getgenie-handler-scripts', GETGENIE_URL . 'assets/dist/admin/js/app-handler.js', ['wp-plugins', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);
		wp_enqueue_script('getgenie-common-scripts', GETGENIE_URL . 'assets/dist/admin/js/common-scripts.js', ['wp-plugins', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);
		wp_enqueue_script('getgenie-templates-scripts', GETGENIE_URL . 'assets/dist/admin/js/templates-scripts.js', ['wp-plugins', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);
		wp_enqueue_script('getgenie-admin-scripts', GETGENIE_URL . 'assets/dist/admin/js/wp-integrations.js', ['wp-plugins', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);
		wp_enqueue_style('getgenie-fonts-style', GETGENIE_URL . 'assets/dist/admin/styles/wp-font-family.css', [], GETGENIE_VERSION);
		wp_enqueue_style('getgenie-editor-style', GETGENIE_URL . 'assets/dist/admin/styles/builder.css', [], GETGENIE_VERSION);
	}

	function builderSupport()
	{
		if (isset($_GET['bricks'])) {
			$this->enqueueScript();
			wp_enqueue_script('getgenie-bricks-scripts', GETGENIE_URL . 'assets/dist/admin/js/bricks-builder.js', ['wp-plugins', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);
		}

		if (isset($_GET['ct_builder'])) {
			$this->enqueueScript();
			wp_enqueue_script('getgenie-oxygen-scripts', GETGENIE_URL . 'assets/dist/admin/js/oxygen-builder.js', ['wp-plugins', 'wp-i18n', 'wp-element', 'wp-dom', 'wp-data'], GETGENIE_VERSION, true);
		}
	}
}
