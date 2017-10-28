import React from 'react';
// import { connect } from 'react-redux';
// import { getLocation } from '../store';

const GoogleResults = ({ loc }) => {
  console.log(loc)
  return (
      <div className="col-xs-12 col-sm-4">
        <h2>Google Results:</h2>
        <ul className="list-unstyled">
          <li>Name: { loc.name }</li>
          <li>Average Rating: { loc.rating }</li>
          <li>Address: { loc.formatted_address }</li>
          <li>Reviews:
            <ul className="list-unstyled">
              {
                !loc.reviews ? '' : (
                  loc.reviews.map(review => {
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

// const mapStateToProps = ({ location }) => {
//   return { location };
// };

// const mapDispatch = { getLocation };

// export default connect(mapStateToProps, mapDispatch)(GoogleResults);
