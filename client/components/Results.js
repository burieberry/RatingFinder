import React from 'react';
import { Link } from 'react-router-dom';

const Results = ({ location, head, yelpReviews, fsReviews }) => {
  return (
      <div className="col-xs-12 col-sm-4">
        <h3>{ head } Reviews:</h3>
        <ul className="list-unstyled">
          <li><strong>Average Rating:</strong> { location.rating ? location.rating : 'Not rated' }</li>
          <li><strong>Reviews:</strong>
            { location.reviews ? <GoogleReviews reviews={ location.reviews } /> : null }
            { yelpReviews ? <YelpReviews reviews={ yelpReviews } /> : null }
            { fsReviews ? <FsReviews reviews={ fsReviews } /> : null }
          </li>
          <li><Link to={ `${ location.shortUrl ? location.shortUrl : location.url }` }>{ head } page</Link></li>
        </ul>
      </div>
  )
};

const GoogleReviews = ({ reviews }) => {
  return (
    <ul className="list-unstyled">
      {
        (
          reviews.map(review => {
            return (
              <li key={ review.time }>
                <ul className="list-unstyled">
                  <li>Rating: { review.rating }</li>
                  <li>By: { review.author_name }</li>
                  <li>{ review.relative_time_description }</li>
                  <li>Description: { review.text }</li>
                </ul>
                <br />
              </li>
            )
          })
        )
      }
    </ul>
  );
};

const YelpReviews = ({ reviews }) => {
  return (
    <ul className="list-unstyled">
      {
        (
          reviews.map(review => {
            return (
              <li key={ review.time_created }>
                <ul className="list-unstyled">
                  <li>Rating: { review.rating }</li>
                  <li>By: { review.user.name }</li>
                  <li>{ review.time_created }</li>
                  <li>Description: { review.text }</li>
                </ul>
                <br />
              </li>
            )
          })
        )
      }
    </ul>
  );
};

const FsReviews = ({ reviews }) => {
  return (
    <ul className="list-unstyled">
      {
        (
          reviews.map(review => {
            return (
              <li key={ review.id }>
                <ul className="list-unstyled">
                  <li>By: { review.user.firstName }</li>
                  <li>{ new Date(review.createdAt * 1000).toDateString() }</li>
                  <li>Description: { review.text }</li>
                </ul>
                <br />
              </li>
            )
          })
        )
      }
    </ul>
  );
};

export default Results;
