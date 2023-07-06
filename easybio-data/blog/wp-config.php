<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'think360_easyBiodatablog');

/** MySQL database username */
define('DB_USER', 'think360_easyBio');

/** MySQL database password */
define('DB_PASSWORD', 'easyBio!23#chd');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

define('WP_MEMORY_LIMIT', '512M');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'D0R%-Rvsn3b8qVR%9HLjiaq3;tMlR#W1,0X`t=4dz%KcMVv?H-!mg&i<Entj|tfv');
define('SECURE_AUTH_KEY',  '$jLMWUH9.THa$eyLedhN!:r@lhNP)pTL/kxxwrbGK}el:+h*HY5(?Yd(vRL6vlF8');
define('LOGGED_IN_KEY',    'y+i*zC~_Q+8>T!=cQ?<+C0xcO6hs@;E*,40qW/%tsL,wPH1Z$p+bB.2Cvqc_5}+K');
define('NONCE_KEY',        '}Tu0&QQBD:tqdurv+HHrVnI+v5;eC8CE3JIB8fhV?2j0Cj3qG8FRCb@6]G`?Iw:x');
define('AUTH_SALT',        'UVSGXORH+:!y:/nc8#%y{zvun[ G3T$4XeSbxi`mW/&hwk)GcNRT[J=8Q+Xo^s`3');
define('SECURE_AUTH_SALT', 'LquIS/9NByXP]#E+MHot&k^gMw>jc>]aC5`!`+/=eTXpvoqnbj.g)4KHmgaB%srP');
define('LOGGED_IN_SALT',   'mf~^D6gEr|ePUCk.UbvH<X:(<J?cXZUq]l6O24[tZ02eF<Tqqv}.2,)bR?U);8@!');
define('NONCE_SALT',       '2RL^ZWLE$W/c.{AI>w-S?t$qwB)kRG!7%+h%K7(0Z wJ[k=:dv&q,Y!cHjSKC+uL');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
