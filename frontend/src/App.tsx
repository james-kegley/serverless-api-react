import React, { Component } from 'react';
import './styles/App.css';
import { submitResponse, getResponse } from './controller/controllers';

//the types of values in the state
type State = {
  email: string,
  address: string,
  firstName: string,
  lastName: string
}

class App extends Component <{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: '',
      address: '',
      firstName: '',
      lastName: ''
    };
  }

  async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let ID = JSON.stringify(Date.now());
    let newUser = [
      ID,
      this.state.email,
      this.state.address,
      this.state.firstName,
      this.state.lastName
    ];

    //resetting the form fields
    this.setState({
      email: '',
      address: '',
      firstName: '',
      lastName: '',
    });

    //sending user data to the api
    await submitResponse(newUser, ID);

    //retreving user data from the api
    const usersCount: number = await getResponse();

    //construction of the success message
    let successMsg: string = `<h2>Successfully added user (${usersCount} users in database)</h2>`;
    successMsg += `<p>ID: ${newUser[0]}</p>`;
    successMsg += `<p>Email: ${newUser[1]}</p>`;
    successMsg += `<p>Address: ${newUser[2]}</p>`;
    successMsg += `<p>First Name: ${newUser[3]}</p>`;
    successMsg += `<p>Last Name: ${newUser[4]}</p>`;

    //adding the success message to the page
    document.getElementById('successDiv')!.innerHTML = successMsg;
  }

  render() {
    return (
      <div className="app">
        <form className="form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.handleSubmit(e)}>
          <input type="text" placeholder="Email" onChange={(e: React.FormEvent<HTMLInputElement>) => this.setState({ email: e.currentTarget.value })} value={this.state.email}/>
          <input type="text" placeholder="Address" onChange={(e: React.FormEvent<HTMLInputElement>) => this.setState({ address: e.currentTarget.value })} value={this.state.address} />
          <input type="text" placeholder="First name" onChange={(e: React.FormEvent<HTMLInputElement>) => this.setState({ firstName: e.currentTarget.value })} value={this.state.firstName} />
          <input type="text" placeholder="Last name" onChange={(e: React.FormEvent<HTMLInputElement>) => this.setState({ lastName: e.currentTarget.value })} value={this.state.lastName} />
          <input type="submit" id="submitUser" value="Submit" />
        </form>
        <div id="successDiv" />
      </div>
    );
  }
}

export default App;
