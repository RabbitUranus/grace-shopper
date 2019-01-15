import React, {Component} from 'react';

export default class ThankYou extends React.Component {
  render() {
    return (
      <div className="thankYouMessage">
        <h1>Thank you, your order has been placed.</h1>
        <h3>You will receive a confirmation email in your inbox soon.</h3>
        <h3>
          In the meantime, please, feel free to contact us at
          team@shinyobjects.com with any further questions.
        </h3>
      </div>
    );
  }
}
