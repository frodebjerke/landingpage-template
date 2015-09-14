var React = require('react');

var Banner = require('../banner');
var Blog = require('../blog');
var Register = require('../register');

var Landing = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function(){
    this.scrollTo(this.props);
  },

  componentWillReceiveProps: function (props) {
    this.scrollTo(props);
  },

  render: function() {
    return (
      <div>
        <Banner ref="banner" />
        <Blog ref="blog" />
        <Register ref="register" />
      </div>
    );
  },

  scrollTo: function (props) {
    var query = props.query;
    if (query && 'scrollTo' in query) {
      var target = this.refs[query.scrollTo];
      if (target) {
        var y = React.findDOMNode(target).offsetTop;
        setWindowScrollPosition(0, y);
      }
    }
  }
});

module.exports = Landing;


function setWindowScrollPosition(scrollX, scrollY) {
  window.scrollTo(scrollX, scrollY);
}

function getWindowScrollPosition() {
  return {
    scrollX: window.pageXOffset || document.documentElement.scrollLeft,
    scrollY: window.pageYOffset || document.documentElement.scrollTop
  };
}
