import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import Link from 'next/link';
import {Text} from '../../consts/translations/websiteNavbar';
import { CommonText } from '../../consts/translations/common';
import Article from '../../consts/models/article';
import * as R from 'ramda';


export const WebsiteNavbar = ({lang, post, path, langArray}) => {
    const [redirectPath, setRedirectPath] = useState('');

    useEffect(() => {
        if (path !== ('/' + lang) && path !== ('/' + lang + '/')) {
            let tmpPath = path.replace(('/' + lang + '/'), '');
            if(tmpPath.endsWith('/[page]')){
                let lastIndexPage = tmpPath.lastIndexOf("/[page]");
                tmpPath= tmpPath.substring(0, lastIndexPage);
            }
            setRedirectPath(tmpPath);
        }
        else {
            setRedirectPath('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);


    if (R.isNil(lang)){
        return '';
    }
    
    return (
        <Navbar bg="dark" variant='dark' sticky='top' expand="lg">
            <Link className="logo navbar-brand" href={"/" + lang + "/"}>
                <img src="/logo_cms.svg" className='logo-image' alt="Harck-CMS logo" />
            </Link>
            <Navbar.Toggle />
            <Navbar.Collapse className="ml-auto justify-content-end">
                <Nav className='text-center'>
                    <Link className='nav-link' href={"/" + lang + "/blog"}>{Text.Blog[lang]}</Link>
                    <Link className='nav-link' href={"/" + lang + "/about"}>{Text.About[lang]}</Link>
                    <Link className='nav-link' href={"/" + lang + "/contact"}>{Text.Contact[lang]}</Link>
                    <NavDropdown id="language-selector" title={CommonText.LanguageText[lang]}>
                        {
                            langArray.map((l, index) => {
                                let otherLink = '';
                                if (!R.isNil(post)) {
                                    let parsedPost = new Article(post);
                                    let links = parsedPost.links;
                                    if (!R.isNil(links[l]) && links[l] !== '') {
                                        otherLink = links[l];
                                    }
                                    else{
                                        otherLink = undefined;
                                    }
                                }
                                return <NavDropdown.Item className='text-center' key={index} href={"/" + l + (otherLink !== '' && !R.isNil(otherLink) ? '/post/' + otherLink :  R.isNil(otherLink) ? '': (redirectPath !== '/' && path !== '/notfound' ? ('/' + redirectPath) : ''))}>{CommonText.LanguageText[l]}</NavDropdown.Item>
                            })
                        }
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}