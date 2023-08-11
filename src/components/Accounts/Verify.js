import React, { useContext, useEffect, useState } from 'react'
import AccountContext from '../../context/accounts/AccountContext'
import { useNavigate } from 'react-router-dom';
import Alert from '../Home/Alert';
import ThemeContext from '../../context/themes/ThemeContext';

export default function Verify() {

  const { verifyEmail, otp, createAccount, accountData, setAlert, alert, hideAlert } = useContext(AccountContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [otpData, setOtpData] = useState('');

  useEffect(() => {
    if (alert.status === 'visible') {
      verifyEmail(accountData.email);
      hideAlert();
    }

  }, [])

  const SubmitForm = (e) => {
    e.preventDefault();

    if (String(otp) === otpData) {
      createAccount({ ...accountData });
      navigate('/login');
    }
    else {
      setAlert({
        status: 'visible',
        type: 'danger',
        msg: 'Invalid OTP!'
      })
    }
  }

  const handleChange = (e) => {
    setOtpData(e.target.value)
  }

  return (
    <div className='container-fluid' >
      <Alert message={alert.msg} type={alert.type} visibility={alert.status} />
      <form className='container p-4 rounded-3 bg-alert-subtle' onSubmit={SubmitForm} >
        <label className='form-label' htmlFor="otp">Enter OTP</label>
        <input className='form-control' type="text" name='otp' id='otp' value={otpData} onChange={handleChange} />
        <br />

        <button className='btn btn-success'>Submit</button>
      </form>
    </div>
  )
}
