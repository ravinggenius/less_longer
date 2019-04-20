import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Button = styled.button`
	background-color: inherit;
	border: 1px solid #999999;
	border-radius: 2px;
	cursor: pointer;
	font-size: 14px;

	&:focus,
	&:hover {
		background-color: #FFFFFF;
		border-color: #333333;
		outline-style: none;
	}
`;

Button.defaultProps = {
	type: 'button'
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	type: PropTypes.oneOf([
		'button',
		'reset',
		'submit'
	])
};

export default Button;
