var React = require('react');
var Link = require('react-router').Link;

var Banner = React.createClass({

  render: function() {
    return (
      <section className="md-banner">
          <h1 className="md-banner--brand">Hello</h1>
        <Link className="typo--btn md-banner--register" to="landing" query={{scrollTo: "register"}}>Join email list thing</Link>
      </section>
    );
  }

});

module.exports = Banner;
