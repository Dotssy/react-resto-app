import React, { Component } from 'react';
import MenuListItem from '../menu-list-item';
import { connect } from 'react-redux';
import WithRestoService from '../hoc';
import { menuLoaded, menuRequested, addedToCart } from '../../actions';
import Spinner from '../spinner';

import './menu-list.scss';

class MenuList extends Component {
    componentDidMount() {
        this.props.menuRequested();
        
        const { RestoService } = this.props;
        RestoService.getMenuItems()
            .then(res => this.props.menuLoaded(res)); 
    }

    render() {
        const { menuItems, loading, addedToCart } = this.props;

        if (loading) {
            return <Spinner />;
        }

        return (
            <ul className="menu__list">
                {
                    menuItems.map(item => {
                        return <MenuListItem 
                                menuItem={item} 
                                key={item.id}
                                onAddToCart={() => addedToCart(item.id)}/>
                    })
                }
            </ul>
        )
    }
};

const mapStateToProps = (state) => {
    return { 
        menuItems: state.menu,
        loading: state.loading
    };
};

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    addedToCart
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));

//TODO: Сделать генерацию айди для добавляемых элементов в корзину
//TODO: Сделать счетчик для одинаковых элементов в корзине
//TODO: Сделать общую цену в шапке для содержимого корзины