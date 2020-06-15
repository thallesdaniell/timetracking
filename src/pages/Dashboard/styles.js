import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: stretch;
`;

export const Sidebar = styled.nav`
    min-width: 250px;
    max-width: 250px;
    background: #1F7EFF;
    color: #fff;
    transition: all 0.3s;
    #sidebar.active {
        margin-left: -250px;
    }
    
    #sidebar .sidebar-header {
        padding: 20px;
        background: #6d7fcc;
    }
    
    #sidebar ul.components {
        padding: 20px 0;
        border-bottom: 1px solid #47748b;
    }
    
    #sidebar ul p {
        color: #fff;
        padding: 10px;
    }
    
    #sidebar ul li a {
        padding: 10px;
        font-size: 1.1em;
        display: block;
    }
    
    #sidebar ul li a:hover {
        color: #7386D5;
        background: #fff;
    }
    
    #sidebar ul li.active>a,
    a[aria-expanded="true"] {
        color: #fff;
        background: #6d7fcc;
    }
    
    a[data-toggle="collapse"] {
        position: relative;
    }
    
    .dropdown-toggle::after {
        display: block;
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
    }
    
    ul ul a {
        font-size: 0.9em !important;
        padding-left: 30px !important;
        background: #6d7fcc;
    }
    
    ul.CTAs {
        padding: 20px;
    }
    
    ul.CTAs a {
        text-align: center;
        font-size: 0.9em !important;
        display: block;
        border-radius: 5px;
        margin-bottom: 5px;
    }
    
    a.download {
        background: #fff;
        color: #7386D5;
    }
    
    a.article,
    a.article:hover {
        background: #6d7fcc !important;
        color: #fff !important;
    }
    p {
        font-family: 'Poppins', sans-serif;
        font-size: 1.1em;
        font-weight: 300;
        line-height: 1.7em;
        color: #999;
    }
    
    a,
    a:hover,
    a:focus {
        color: inherit;
        text-decoration: none;
        transition: all 0.3s;
    }
    
    .navbar {
        padding: 15px 10px;
        background: #fff;
        border: none;
        border-radius: 0;
        margin-bottom: 40px;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .navbar-btn {
        box-shadow: none;
        outline: none !important;
        border: none;
    }
    
    .line {
        width: 100%;
        height: 1px;
        border-bottom: 1px dashed #ddd;
        margin: 40px 0;
    }
`;


export const Content = styled.div`
    width: 100%;
    padding: 20px;
    min-height: 100vh;
    transition: all 0.3s;
`;
