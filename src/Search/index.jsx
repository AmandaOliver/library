import React, {PureComponent, Fragment} from 'react'
import Select from 'react-select'
import conf from '../configuration'
import './styles.scss'

class Search extends PureComponent {
    state = {
        selectedOption: undefined,
        selectedOptionEnum: undefined
    }
    handleChange = (selected) => {
        this.setState({ ...this.state, selectedOption: selected.value })
    }
    handleChangeEnum = (selected) => {
        this.setState({ ...this.state, selectedOptionEnum: selected })
    }
    getValueList = string => conf.propertyEnumMap[string]

    render() {
        const { selectedOption } = this.state
        const propertyIsEnum = selectedOption === conf.bookProperties[1] ||
            selectedOption === conf.bookProperties[4]
        const transformForOptions = array => array.map((p, i) => ({ label: p, value: p }))

        return (
            <Fragment>
                <Select className="basic-single dropdown"
                    classNamePrefix="select"
                    onChange={this.handleChange}
                    defaultValue={conf.bookProperties[0]}
                    options={transformForOptions(conf.bookProperties)}/>

                {propertyIsEnum &&
                    <Select className="basic-single dropdown"
                        classNamePrefix="select"
                        onChange={this.handleChangeEnum}
                        options={transformForOptions(conf[this.getValueList(selectedOption)])} />
                }

            </Fragment>
        )


    }
}

export default Search
