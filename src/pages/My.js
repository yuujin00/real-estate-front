import { useNavigate } from 'react-router-dom';
import { Grid, Button} from '../components';

function My(){
    const navigate = useNavigate();

    const handleLogout = () => {
      // 토큰 삭제
      document.cookie = 'token=; path=/; max-age=0; Secure';
  
      // 로그인 페이지로 이동
      navigate('/login');
    };
  
    return (
      <div>
        <h1>My Page</h1>
        <Button theme='startBtn' children='LOGOUT' type='submit' onClick={handleLogout}/>
      </div>
    );
}

export default My;