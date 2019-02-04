import React, {PureComponent} from 'react'
import Book from '../Book'
import { isFirstPageLoaded, worker, getBookById } from '../library'
import conf from '../configuration'

import './styles.scss'
const bookHeight = '140';

class Catalog extends PureComponent {
    constructor() {
        super()
        this.state = {
            indexInit: 0,
            bookIds: [],
            isLoading: true,
            higestIndexRender: 0,
        }

        this.bindedInitializeComponent = this.initializeComponent.bind(this)

        this.catalogRef = React.createRef()
        this.bottomRef = React.createRef()
        this.bookWrapper = React.createRef()
    }
    initializeComponent(event) {
        const needsToLoadInitialBooks = this.state.isLoading === true && isFirstPageLoaded()
        const unsubscribeFromWorker = () => worker.removeEventListener('message', this.bindedInitializeComponent)

        //console.info('Can I render something?: ', needsToLoadInitialBooks )
        if (needsToLoadInitialBooks) {
            unsubscribeFromWorker()
            this.setState({isLoading: false })
            this.getMoreBooks(0, 10)
            this.bottomRef.current.style.height = this.calculateBottomSpace() + 'px'
        }
    }

    getMoreBooks(indexInit, indexEnd) {
        const { higestIndexRender } = this.state
        //console.info(`Adding Ids from ${indexInit} to ${indexEnd - 1}`)
        this.setState({
            bookIds: [
                ...new Array(indexEnd-indexInit+1).fill().map((_, i) => i+indexInit)
            ],
        })
    }
    getScrollPosition() {
        const scrollPosition =  document.querySelector('html').scrollTop > document.body.scrollTop ?  document.querySelector('html').scrollTop : document.body.scrollTop
        return scrollPosition
    }

    getBookHeight() {
        return bookHeight
    }
    getFirstIndex() {
        return Math.floor(this.getScrollPosition()/this.getBookHeight())
    }
    getLastIndex() {
        return Math.ceil((this.getScrollPosition()+document.documentElement.clientHeight)/this.getBookHeight())
    }
    calculateTopSpace() {
        return this.getScrollPosition()
    }
    calculateBottomSpace() {
        return (conf.librarySize-this.getLastIndex())*this.getBookHeight()
    }
    componentDidMount() {
        let timeoutId;
        const onScroll = () => {
            this.getMoreBooks(this.getFirstIndex(), this.getLastIndex())

        }
        window.onscroll = () => {
            this.bookWrapper.current.style.top = -1 * this.getScrollPosition() % 100000 + 'px'
            clearTimeout(timeoutId)
            onScroll()
            // const { scrollTop, offsetHeight } = document.documentElement
            // const isEndOfVisibleArea = window.innerHeight + scrollTop === offsetHeight

            // const lastBookIsLoaded = this.state.bookIds[conf.librarySize-1]
            // console.log(lastBookIsLoaded)
            // if (isEndOfVisibleArea && !lastBookIsLoaded) {
            // }
        }
        // listen to the web worker to check when to render the first elements
        worker.addEventListener('message', this.bindedInitializeComponent);
    }
    render() {
        const bookComponents = this.state.bookIds.map(bookId => {
            return <Book key={bookId} book={getBookById(bookId)} />
        })
        return (
            <div ref={this.catalogRef} className="catalog">
                <div className="spaceHolder" style={{ height: '500px', position: 'fixed' }}>
                    <div ref={this.bookWrapper} className="bookWrapper">
                        {bookComponents}
                    </div>
                </div>
             <div className="spaceHolder" ref={this.bottomRef}></div>
            </div>
        )
    }
}

export default Catalog;
