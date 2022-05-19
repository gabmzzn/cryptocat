import scss from './Footer.module.scss'

export default function Footer() {

	return (
		<div className={scss.footer}>
			<div className={scss['footer-content']}>
				{/* <div className={scss['about']}>
                    <div className={scss['firm-container']}>
                        <div>
                            <div className={scss['firm']}>
                                <span className={scss['juan']}>Juan</span><br />
                                <span className={scss['gab']}>Gabriel</span><br />
                                <span className={scss['mazz']}>Mazzoleni</span><br />
                                <span className={scss['soft']}>Software Developer</span><br />
                            </div>
                        </div>
                    </div>
                </div> */}
				<div className={scss['description']}>
					{/* <div>
                        <div class="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="dark" data-type="VERTICAL" data-vanity="juan-gabriel-mazzoleni" data-version="v1"></div>
                    </div> */}
					{/* <div className={scss['contact']} style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className={scss['contact-link']}>
                            <a href='https://github.com/gabmzzn/investraining' target='_blank'><img src='.\.\assets\imgs\github.png' /></a>
                        </div>
                        <div className={scss['contact-link']}>
                            <a href='https://www.linkedin.com/in/juan-gabriel-mazzoleni-a6b506142/' target='_blank'><img
                                src='.\.\assets\imgs\linkedin.png' /></a>
                        </div>
                        <div className={scss['contact-link']}>
                            <a href='mailto: gabmzzn@gmail.com' title='gabmzzn@gmail.com' target='_blank'><img
                                src='.\.\assets\imgs\mail.png' /></a>
                        </div>
                    </div> */}
				</div>

			</div>
			{/* <script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script> */}
		</div>)
}