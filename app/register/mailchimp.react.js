var React = require('react');

var Mailchimp = React.createClass({
  getInitialState: function () {
    return {
      email: ""
    }
  },

  render: function() {

    const formUrl = ""; // TODO parameterize

    const placeholderText = "Your email";
    const submitText = "Subscribe"

    return (
      <form  className="md-register--form" action={formUrl} method="post" target=":blank" noValidate>
        <input className="typo--input" type="email" value={this.state.email} name="EMAIL" placeholder={placeholderText} onChange={this.onChange} required />
        <div style={{position: "absolute", left: "-5000px"}}>
          <input type="text" tabIndex="-1" value="" />
        </div>
        <div className="clear">
          <input className="typo--submit" type="submit" value={submitText} name="subscribe" />
        </div>
      </form>
    );
  },

  onChange: function (event) {
    this.setState({
      email: event.target.value
    });
  }

});

module.exports = Mailchimp;
