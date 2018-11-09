/*
 * This file is part of thumbor-toy project.
 *
 * (c) Raphaël Benitte <thumbor-toy@rbenitte.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react';
import ReactZeroClipboard   from 'react-zeroclipboard';
import SourceStore          from './../stores/SourceStore';
import ResizeStore          from './../stores/ResizeStore';

class Url extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notice: false,
            dimensions: ResizeStore.config(),
            image: SourceStore.image()
        };
        this.timer = null;
    }

    RequestUrl(data) {
        let request = {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            body: data
        }
        try {
            fetch(url, request)
            .then((resp) => resp.text())   
            .then(resp => {
                console.log(resp)
            })  
        } catch (error) {
            console.log("Error", error.message)
        }
    }


    onAfterCopy() {
        this.setState({
            notice: true
        });
    }

    onCopyHover() {
        this.setState({
            notice: false
        });
    }

    componentWillUpdate() {
        let url = {
            width: this.state.dimensions.width,
            height: this.state.dimensions.height, 
            url: this.state.image,
            smart: true
        }
        this.RequestUrl(JSON.stringify(url))
    }

    render() {
        var statusClasses = 'url__status';
        var statusNode = null;
        if (this.props.error === true) {
            statusClasses += ' _has-error';
            statusNode = <i className="fa fa-warning"/>;
        } else if (this.props.url === '' || !SourceStore.isValid()) {
            statusClasses += ' _is-unkown';
            statusNode = <i className="fa fa-question"/>;
        } else {
            statusNode = <i className="fa fa-check"/>;
        }

        console.log("NARUTOOO", this.state)

        return (
            <div>
                <input type="text" readOnly value={this.props.url} />
                <span className={statusClasses}>
                    {statusNode}
                </span>
                <ReactZeroClipboard text={this.props.url} onAfterCopy={this.onAfterCopy.bind(this)}>
                    <span className="url__copy" onMouseEnter={this.onCopyHover.bind(this)}>
                        <i className="fa fa-clipboard"/>
                    </span>
                </ReactZeroClipboard>
                <span className="url__copy__tooltip">
                    {this.state.notice ? 'copied' : 'copy to clipboard' }
                </span>
            </div>
        );
    }
}

export default Url;
