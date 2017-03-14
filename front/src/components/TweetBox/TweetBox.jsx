import React, { Component, PropTypes } from 'react';

class TweetBox extends Component {
    static propTypes = {
        publish: PropTypes.func.isRequired,
    };

    state = {
      value: '',
    };

    handleChange = ({target: {value} }) => {
        this.setState({ value });
    };

    handleSubmit = () => {
        const { value } = this.state;
        const {publish} = this.props;

        if (value.length &&  value.length <= 140)
        {
            publish(value);
            this.setState({ value: '' });
        }
    };

    render() {
        const {value} = this.state;

        return (
          <div className="tweetbox">
              <textarea
                  rows={3}
                  placeholder="compose your tweet"
                  value={value}
                  onChange={this.handleChange}
                  className={value.length > 140 && 'alert'}
              />
              <div className="action">
                  <span className="count">{140 - value.length}</span>
                  <button
                      type="button"
                      onClick={this.handleSubmit}
                  >tweet</button>
              </div>
          </div>
        );
    }
}

export default TweetBox;