import React, {Component} from 'react'
import './ClientInterface.scss'
import HistoryController from '../../controllers/HistoryController'
import toaster from 'toasted-notes'
import ProgressBar from '../../Components/ProgressBar/ProgressBar'
import {getDate, getSum} from '../../store/universalFunctions'

export default class ClientInterface extends Component {
    state: {
        data: {},
    }

    componentDidMount = async () => {
        this.setState({
            data: await HistoryController.prototype.getHistoryReport(this.props.match.params.number),
        })
    }

    copyURL = () => {
        navigator.clipboard.writeText(document.location)
        toaster.notify('Ссылка скопирована!', {
            position: 'bottom-right',
            duration: 3000,
        })
    }

    renderContent = () => {
        const endDate = new Date(this.state.data.expiration_at),
            startDate = new Date(this.state.data.issued_at)

        return (
            <div className={'client-interface__info'}>
                <ProgressBar
                    data={this.state.data}
                    endDate={endDate.getTime()}/>

                <h2 className={'mb-4 mt-5'}>Информация о займе</h2>

                <div className={'client-interface__info-item'}>
                    <p>Кем:</p> <span>{this.state.data.client_name}</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Кому: </p> <span>{this.state.data.user_name}</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Цель: </p> <span>{this.state.data.goal}</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Дата выдачи:</p> <span>{getDate(startDate)}</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Дата возврата:</p> <span>{getDate(endDate)}</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Сумма займа: </p> <span>{getSum(this.state.data.amount)} ₽</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Ставка: </p> <span>{this.state.data.rate} %</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Ставка при просрочке: </p> <span>{this.state.data.increased_rate} %</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Статус: </p> <span>{this.state.data.type === 'PROCENT' ? 'Проценты' : 'Долг'}</span>
                </div>

                <h2 className={'mb-4'}>
                    История платежей
                </h2>

                <table className="table">
                    <thead className="thead">
                    <tr className={'table_dark'}>
                        <th scope="col">#</th>
                        <th scope="col">Дата платежа</th>
                        <th scope="col">Сумма</th>
                        <th scope="col">Тип</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.history_loan.map((element, index) => (
                            <tr key={element.id}>
                                <td><b>{index + 1}</b></td>
                                <td>{new Date(element.date).toLocaleDateString()}</td>
                                <td>{getSum(element.amount)}</td>
                                <td>{element.type === 'PROCENT' ? 'Проценты' : 'Долг'}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <div className={'client-interface'}>
                <h1 className={'mb-5'}>
                    Выписка
                    <i onClick={this.copyURL} className="fa fa-files-o fa-animate ml-3" aria-hidden="true"></i>
                </h1>

                {
                    this.state && Object.keys(this.state.data).length !== 0
                        ? this.renderContent()
                        : null
                }
            </div>
        )
    }
}