import React from 'react';

const GoogleResults = ({ location, head }) => {
  return (
      <div className="col-xs-12 col-sm-4">
        <h2>{ head } Results:</h2>
        <ul className="list-unstyled">
          <li>Name: { location.name }</li>
          <li>Average Rating: { location.rating }</li>
          {/* <li>Address: { location.formatted_address }</li> */}
          <li>Reviews:
            <ul className="list-unstyled">
              {
                !location.reviews ? '' : (
                  location.reviews.map(review => {
                    return (
                      <li key={ review.time }>
                        <ul className="list-unstyled">
                          <li>Rating: { review.rating }</li>
                          <li>By: { review.author_name }</li>
                          <li>Description: { review.text }</li>
                        </ul>
                        <br />
                      </li>
                    )
                  })
                )
              }
            </ul>
          </li>
        </ul>
      </div>
  )
};

export default GoogleResults;
