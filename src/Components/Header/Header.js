import React, {Component} from 'react'
import './Header.scss'
import img from '../../img/logo.png'
import {NavLink} from 'react-router-dom'

export default class Header extends Component {
    state = {
        activeTab: '',
    }

    changeActiveTab = (e) => {
        this.setState({
            activeTab: e.target.id,
        })
    }

    logout = () => {

    }

    render() {
        return (
            <div className={'header'}>
                <NavLink to={'/'} className={'header__logo'}>
                    <img src={img} alt="logo"/>
                </NavLink>

                <div className={'header__nav-bar'}>
                    <NavLink
                        id={'loans'}
                        onClick={this.changeActiveTab}
                        className={`header__nav-item ${this.state.activeTab === 'loans' ? 'header__nav-item_active' : ''}`}
                        to={'/loans'}>
                        Займы
                    </NavLink>
                    <NavLink
                        id={'clients'}
                        onClick={this.changeActiveTab}
                        className={`header__nav-item ${this.state.activeTab === 'clients' ? 'header__nav-item_active' : ''}`}
                        to={'/clients'}>
                        Клиенты
                    </NavLink>
                </div>

                <div className={'link'} onClick={this.logout}>
                    <i className="fa fa-sign-out" aria-hidden="true" ></i>
                    <span>Выйти</span>
                </div>
            </div>
        )
    }
}