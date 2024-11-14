import React from 'react';
import { Link } from 'react-router-dom';

const IconWithLink = ({ imageSrc, link, altText, heading }) => {
  return (
    <div className="icon-item">
      <Link to={link} className="icon-link"> {/* Added icon-link class */}
        <img src={imageSrc} alt={altText} className="icon-image" />
        <h3 className="icon-heading">{heading}</h3> {/* Heading also with icon-heading class */}
      </Link>
    </div>
  );
};

export default IconWithLink;
