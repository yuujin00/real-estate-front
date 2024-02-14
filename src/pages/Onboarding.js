// Onboarding.js
import OnboardingSlide from '../components/Onboarding/OnboardingSlide';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '../components/index.js';

function Onboarding() {
    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        navigate(path);
    };

    const onClickLogo = () => {
        navigate('/');
    };

    return (
        <>
            <div style={onboardingWrap}>
                <Grid theme='headerMain'>
                    <Button theme='headerTitle' onClick={onClickLogo} children='로고' />
                </Grid>

                <Grid theme='onboardingSlide'>
					<OnboardingSlide handleButtonClick={handleButtonClick} />
                </Grid>
            </div>
        </>
    );
}


const onboardingWrap = {
    height: '100%',
};

export default Onboarding;
