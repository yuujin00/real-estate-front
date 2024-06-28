import { Grid, Button, Img } from '..';
import Carousel from 'react-material-ui-carousel';
import onboarding1 from '../../assets/images/onboarding3.jpg';
import onboarding2 from '../../assets/images/onboarding4.jpg';

function OnboardingSlide({ handleButtonClick } ) {
	const items = [
		{
			image: onboarding1,
			content:
				'<center><h3><strong>One-Stop Real Estate Contract</strong></h2>Budong offers <br>property listing, transaction,<br> and contract services <br>without any fees or paper stamps.</center>',
			showButton: false
		},
		{
			image: onboarding2,
			content:
				'<center><h3><strong>One-Stop Real Estate Contract</strong></h2>Budong provides <br>an easy and convenient property contract service <br>without the need for offline paperwork.</center>',
			showButton: false
		},
		{
			content:
				'<center><h3><strong><br>One-Stop Real Estate Contract</strong></h2></center><br>In the era of online transactions,<br> if you want fast and <br>secure real estate contracts,<br> start now.',
			showButton: true
		},
	];
	return (
		<>	
			<div style={{ height: '30px' }}></div>
			<Carousel
				autoPlay={false}
				animation='slide'
				timeout={500}
				navButtonsProps={{
					$next: { style: { display: 'none' } },
					$prev: { style: { display: 'none' } }
				  }}
				>
				{items.map((item, i) => (
					<div style={{ height: 500, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} key={i}>
						{item.image && (
                            <Img theme='onboardingImg' src={item.image} alt='onboarding' />
                        )}
						<Grid theme='onboardingContent'>
							<div dangerouslySetInnerHTML={{ __html: item.content }} />
						</Grid>
                    	{i === 2 && item.showButton && ( 
						<Grid theme='main_background'>
							<Button theme='mainStartBtn' children='START' onClick={() => handleButtonClick('login')} />
							<Button theme='mainStartBtn' children='Sign UP' onClick={() => handleButtonClick('/signup')} />
						</Grid>
                    )}
					</div>
				))}
			</Carousel>
		</>
	);
}

export default OnboardingSlide;