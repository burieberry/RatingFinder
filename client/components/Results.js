import React from 'react';
import { Link } from 'react-router-dom';

const Results = ({ location, head, yelpReviews, fsReviews }) => {
  return (
      <div className="col-xs-12 col-sm-4">
      {
        !location ? '' : (
          <div>
            <h3>{ head } Reviews:</h3>
              <h4><strong>Average Rating:</strong> <span className="rating">{ location.rating ? location.rating : 'Not rated' }</span></h4>
              <h4>Reviews</h4>
                { location.reviews ? <GoogleReviews reviews={ location.reviews } /> : null }
                { yelpReviews ? <YelpReviews reviews={ yelpReviews } /> : null }
                { fsReviews ? <FsReviews reviews={ fsReviews } /> : null }
              <Link className="linkToPage" to={ `${ location.shortUrl ? location.shortUrl : location.url }` }>Read more on { head }.</Link>
          </div>
          )
      }
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
                <ul className="card review">
                  <li><strong>Rating:</strong> { review.rating }</li>
                  <li>By: { review.author_name }</li>
                  <li><em>{ review.relative_time_description }</em></li>
                  <li><i className="fa fa-quote-left" aria-hidden="true" /> { review.text } <i className="fa fa-quote-right" aria-hidden="true" /></li>
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
                <ul className="card review">
                  <li><strong>Rating:</strong> { review.rating }</li>
                  <li>By: { review.user.name }</li>
                  <li><em>{ review.time_created }</em></li>
                  <li><i className="fa fa-quote-left" aria-hidden="true" /> { review.text } <i className="fa fa-quote-right" aria-hidden="true" /></li>
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
    <ul className="list-unstyled review-list">
      {
        (
          reviews.map(review => {
            return (
              <li key={ review.id }>
                <ul className="card review">
                  <li>By: { review.user.firstName }</li>
                  <li><em>{ new Date(review.createdAt * 1000).toDateString() }</em></li>
                  <li><i className="fa fa-quote-left" aria-hidden="true" /> { review.text } <i className="fa fa-quote-right" aria-hidden="true" /></li>
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
