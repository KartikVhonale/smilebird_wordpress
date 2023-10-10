<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress2' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '09ir{z5CAvqz?1QcHo*F]&Txx4>6:<!X0TixR(=8$m]}O!52$,:|/d6!.w ==`nL' );
define( 'SECURE_AUTH_KEY',  'ZKc1ACN2zVi2]Rr.K]*CA~P-_A}(MYK1?n)4L0.l;D|%u31K>FTWXuP d={:XcMP' );
define( 'LOGGED_IN_KEY',    'rl]GJLS|wB]nC1k:a,Wc?B:FuU(Tlu_O(YV8C*Z|?I{>RZ.vc;lQ$zC}qX7Hji1>' );
define( 'NONCE_KEY',        'd4Pzu;]Mni[z%xq/S?2s<XX!@di$/nb [HcD:/7ejP{tq=Jz%#4r4E;Vcw,yL84o' );
define( 'AUTH_SALT',        'h{1.7z37x@GGu`o?3DTTFbTc#k.>Xqet[LXSpp|)?q&9{OWs.P}pp5.%$e{]M&PK' );
define( 'SECURE_AUTH_SALT', '}X_?K8~.hr#M>29`J_wK1$+6*U!D].x5(1CD:2U3],6f./YUDo>u<&),B+|[>6-o' );
define( 'LOGGED_IN_SALT',   '<Q By*hP(laKzY.6/^ok&G#$nG+o}2$Qz:-Tnh+(!6rrkVo7S>{ra>t7N|w !=]5' );
define( 'NONCE_SALT',       'IwE.Q3T30hOkZb?6=z.Fs}W8);?#zn_p`Rz!sfZjpLN0#J4MAutx1bi2)JQ0%se&' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
