<?php
if ( ! is_page_template( 'page-template-blank.php' ) ) : ?>

			<footer id="main-footer">
				<?php get_sidebar( 'footer' ); ?>


		<?php
			if ( has_nav_menu( 'footer-menu' ) ) : ?>

				<div id="et-footer-nav">
					<div class="container">
						<?php
							wp_nav_menu( array(
								'theme_location' => 'footer-menu',
								'depth'          => '1',
								'menu_class'     => 'bottom-nav',
								'container'      => '',
								'fallback_cb'    => '',
							) );
						?>
					</div>
				</div> <!-- #et-footer-nav -->

			<?php endif; ?>

				<div id="footer-bottom">
					<div class="container clearfix">
				<?php
					if ( false !== et_get_option( 'show_footer_social_icons', true ) ) {
						get_template_part( 'includes/social_icons', 'footer' );
					}
				?>
						<div class="social-icon socialBox">
							<a target="_blank" href="https://www.facebook.com/easybiodata"><img src="images/facebook-icon.svg"></a>
							<a target="_blank" href="https://twitter.com/easybiodata"><img src="images/twitter-icon.svg"></a>
							<a target="_blank" href="https://www.youtube.com/user/easyBiodata"><img src="images/youtube-icon.svg"></a>
						</div>
						<!-- <p id="footer-info"><a href="http://www.elegantthemes.com" title="Premium WordPress Themes">Site Copyright</a> | <a href="http://www.wordpress.org">Web Design Canberra</a></p>-->
					</div>	<!-- .container -->
				</div>
			</footer> <!-- #main-footer -->
		</div> <!-- #et-main-area -->

<?php endif; // ! is_page_template( 'page-template-blank.php' ) ?>

	</div> <!-- #page-container -->

	<?php wp_footer(); ?>
</body>
</html>