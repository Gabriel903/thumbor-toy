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
import ResizeStore  from './ResizeStore';

// const url = {
//     width: width,
//     height: height,
//     smart: smart,
//     image_url: image_url
// }

class Url extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dimensions: ResizeStore.config()
            notice: false
        };
        this.timer = null;
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

    RequestUrl(url) {
        let request = {
            method: 'POST',
            mode: 'cors',
            cache: 'default'
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
        debugger

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
