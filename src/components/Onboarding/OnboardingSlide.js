import { Grid, Button, Img } from '..';
import Carousel from 'react-material-ui-carousel';
import onboarding1 from '../../assets/images/onboarding3.jpg';
import onboarding2 from '../../assets/images/onboarding4.jpg';

function OnboardingSlide({ handleButtonClick } ) {
	const items = [
		{
			image: onboarding1,
			content:
				'<center><h2><strong>부동산 원스톱 전자계약</strong></h2><br>부동부동은 수수료와 종이 날인 없이<br> 매물 등록, 매물 거래 서비스를<br> 제공합니다.</center>',
			showButton: false
		},
		{
			image: onboarding2,
			content:
				'<center><h2><strong>부동산 원스톱 전자계약</strong></h2><br>부동부동은 ~~~한<br><br> 매물 계약 서비스를 제공합니다.</center>',
			showButton: false
		},
		{
			content:
				'<center><h2><strong><br>부동산 원스톱 전자계약</strong></h2></center><br>21세기 디지털 혁명 시대,<br> 무엇보다 빠르고 편리한 부동산 계약을 <br>원하신다면.',
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
							<Button theme='mainStartBtn' children='시작하기' onClick={() => handleButtonClick('login')} />
							<Button theme='mainStartBtn' children='계정이 없다면? 회원가입' onClick={() => handleButtonClick('/signup')} />
						</Grid>
                    )}
					</div>
				))}
			</Carousel>
		</>
	);
}

export default OnboardingSlide;