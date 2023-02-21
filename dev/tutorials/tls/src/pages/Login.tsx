import React from 'react';

const Login = (styles: Record<string, string>) => {
	return (
		<div className={` bg-primary ${styles.paddingX} ${styles.flexStart}`}>
			<div className={`${styles.boxWidth}`}>Login</div>
		</div>
	);
};

export default Login;
