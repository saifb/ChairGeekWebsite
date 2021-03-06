import React from 'react'
import ReactTooltip from 'react-tooltip'
import LibrarySeat from "../components/LibrarySeat";
import HeatMap from "../components/LibraryTableHeatmap";

export default class LibraryTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleView: true
        }
    }

    toggleButton = () => {
        this.setState(prevState => ({
            ...prevState,
            toggleView: !prevState.toggleView
        }))

        console.log(this.state.toggleView)
    }

    renderComponent(peopleAvailable) {
        if(this.state.toggleView) {
            return <div className="four-seats">
                <div className="table-container">
                    <button className="btn-sm icon-button float-left ml-1" data-tip data-for="heatMapInfo" onClick={() => this.toggleButton()}>
                        <ReactTooltip id="heatMapInfo" type="info">
                            <span>Click to see my HeatMap!</span>
                        </ReactTooltip>
                        <i className="fa fa-info-circle fa-2x"></i>
                    </button>
                </div>
                <LibrarySeat seatAvailable={this.props.table.seatOccupation.charAt(0) === "0" ? true : false} tableId={this.props.table.tableId} seatId={1}/>
                <LibrarySeat seatAvailable={this.props.table.seatOccupation.charAt(1) === "0" ? true : false} tableId={this.props.table.tableId} seatId={2}/>
                <div className="table-container">
                    <div
                        className={peopleAvailable}>
                        <h2>Table {this.props.table.tableId}</h2>
                        <h5 className="d-none d-md-block">{this.props.table.capacity - this.props.table.numPeople}/{this.props.table.capacity} Available</h5>
                    </div>
                </div>
                <LibrarySeat seatAvailable={this.props.table.seatOccupation.charAt(2) === "0" ? true : false} tableId={this.props.table.tableId} seatId={3}/>
                <LibrarySeat seatAvailable={this.props.table.seatOccupation.charAt(3) === "0" ? true : false} tableId={this.props.table.tableId} seatId={4}/>
            </div>
        } else {
            return (
                <HeatMap table={this.props.table} toggleView={this.toggleButton}/>
            )
        }
    }

    render() {
        const numberOfPeople = this.props.table.numPeople;
        let peopleAvailable
        if (numberOfPeople === 0) {
            peopleAvailable = "tableEmpty"
        } else if (numberOfPeople === 1) {
            peopleAvailable = "tableOneAvailable"
        } else if (numberOfPeople === 2) {
            peopleAvailable = "tableTwoAvailable"
        } else if (numberOfPeople === 3) {
            peopleAvailable = "tableThreeAvailable"
        } else {
            peopleAvailable = "tableFourAvailable"
        }

        return (
            this.renderComponent(peopleAvailable)
        )
    }
}