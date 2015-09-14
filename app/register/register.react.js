var React = require('react');
var Mailchimp = require('./mailchimp.react');

var Register = React.createClass({

  render: function() {
    return (
      <section className="md-register">
        <h1 className="typo--header">Registrering</h1>
        <div className="md-register--mailchimp">
          <Mailchimp />
        </div>
      </section>
    );
  }

});

module.exports = Register;
