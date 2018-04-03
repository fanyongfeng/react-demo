import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Icon = ({ className, style = {}, name = '', size = 16, color = '#222', ...resetProps }) => {
  const cls = classNames({
    [className]: !!className,
    [`icon-${name}`]: !!name,
  });
  return <i className={cls} style={{ fontSize: `${size}px`, color, ...style }} {...resetProps} />;
};

Icon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

export default Icon;
