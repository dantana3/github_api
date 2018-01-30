import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
// Import NM LV Styles
//import './ui-toolkit/css/nm-cx/main.css';
import axios from 'axios';

class GithubDataApp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            searchInput: "",
            searchData: "",
            ghScore: "",
            ghError: "",
            activateBtn: false,
            textArea: "textarea e_black"
        }
        this.onSearchInputChange = this.onSearchInputChange.bind(this)
        this.onSearchClick = this.onSearchClick.bind(this)
        this.getGithubData = this.getGithubData.bind(this)
    }

    onSearchInputChange(e){
        let localInput = e.target.value
        this.setState({searchInput: localInput})
        localInput = e.target.value.trim()
        if(localInput.length > 0){
            this.setState({activateBtn: true})
        }else{
            this.setState({activateBtn: false})
        }
    }

    onSearchClick(){
        let localUserName = this.state.searchInput.trim()
        this.setState({
            ghScore: "",
            searchInput: "",
            activateBtn: false
        })

        this.getGithubData(localUserName)
    }

    getGithubData(in_name){
        let api_site = "https://api.github.com/users/" + in_name
        let promise = axios.get(api_site)
        let tempError = ""
        let tempScore = 0
        let tempStyle = ""
        
        promise.then( response => {
            this.setState({searchData: response.data})            
            tempScore = response.data.followers + response.data.public_repos

            if(response.data.name === null){
                tempScore = ""
                tempError = "Username found is null, pick a different Github username!"
                tempStyle = "textarea e_black"
            }else if(tempScore < 20){
                // use joe
                tempError = "Needs Work!"
                tempStyle = "textarea e_red"
            }else if(tempScore < 50){
                // use perry
                tempError = "A Decent Start!"
                tempStyle = "textarea e_orange"
            }else if(tempScore < 100){
                // use logan
                tempError = "Doing Good!"
                tempStyle = "textarea e_black"
            }else if(tempScore < 200){
                // use john
                tempError = "Great Job!"
                tempStyle = "textarea e_green"
            }else if(tempScore >= 200){
                // use dan
                tempError = "Github Elite!"
                tempStyle = "textarea e_blue"
            }

            this.setState({
                ghScore: tempScore,
                ghError: tempError,
                textArea: tempStyle
            })
        })

        promise.catch(err => {
            console.log(err.response.status);
        })
    }

    render(){
        // let itemsListMap = (itemObject, arrayIndex) => {
        //     return ( <RenderItemsList itemValueText={itemObject.listText}
        //                               rowDisplay={itemObject.display ? "displayDiv":"hideDiv"} />
        //     )
        // }
        return(
        <div className="main_app center flexCol">
            <div className="header_container center div_borders">GitHub Score</div>
            <div className="search_container center flex_col div_borders">
                    <label>Github Username: <input onChange={this.onSearchInputChange} placeholder="github_username" value={this.state.searchInput} /></label>
                    <button disabled={!this.state.activateBtn} onClick={this.onSearchClick}>Calculate my Github Scores</button>
            </div>
            <div className="info_container center flex_col div_borders">
                <div className="flex_row">
                    <label>Your Score: <input readOnly  className="input" type="text" cols="35" rows="3"/>{this.state.ghScore}</label>
                    <input readOnly  className="input" type="text"/>
                    <textarea disabled readOnly className={this.state.textArea} cols="35" rows="3" value={this.state.ghError}/>
                </div>
            </div>
        </div>
        )
    }
}

ReactDOM.render(<GithubDataApp />, document.getElementById('root'));
registerServiceWorker();