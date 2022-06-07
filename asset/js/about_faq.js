function display(a) {
    const t_id = document.getElementsByClassName("faq_content");
    const t_ic_down = document.getElementsByClassName("ic_down");
    const t_ic_up = document.getElementsByClassName("ic_up");
    /* id */
    if (t_id[a].style.display == "block") { 
        t_id[a].style.display = "none";
    }
    else {
            t_id[a].style.display = "block";
    } ;   

    /* icon down */
    if (t_ic_down[a].style.display == "block") { 
        t_ic_down[a].style.display = "none";
    }
    else {
            t_ic_down[a].style.display = "block";
    } ;

    /* icon up */
    if (t_ic_up[a].style.display == "block") { 
        t_ic_up[a].style.display = "none";
    }
    else {
        t_ic_up[a].style.display = "block";
    } ; 
}