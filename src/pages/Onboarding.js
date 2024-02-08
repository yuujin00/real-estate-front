import { useNavigate } from 'react-router-dom';
import { Grid, Button} from '../components/index.js';
//import main from '../assets/images/mainCharacter.png';
//import main_bg from '../assets/images/main_bg.svg';
//import logo from '../assets/images/logo.svg';

function Onboarding() {
	const navigate = useNavigate();

	const handleButtonClick = (path) => {
		navigate(path);
	};

	return (
		<>
			<Grid theme='main'>
				<Grid theme='introTagLine'>소비 데이터 기반 주식 추천 서비스</Grid>
				<Grid theme='description'>평범한 일상 속에서 개인화된 주식 투자 기회를 제안합니다.</Grid>
			</Grid>
		</>
	);
};

export default Onboarding;