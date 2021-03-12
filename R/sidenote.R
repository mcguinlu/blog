sidenote <- function(text) {
  if (text == "R") {
    return(
      paste0(
        "<span class=\"sidenote-number\"></span><span class=\"sidenote\">",
        "Pronounced <a href = \"/2019/01/01/r-vs-r/\">\"oar\"</a>.</span>"
      )
    )
  } else {
    return(
      paste0(
        "<span class=\"sidenote-number\"></span><span class=\"sidenote\">",
        text,
        "</span>"
      )
    )
  }
  
}

sidenote_link <- function(text) {
    return(
      paste0(
        "<span class=\"sidenote-number\"></span><span class=\"sidenote\">See <a href = \"",
        text,
        "\">here</a>.</span>"
      )
    )
  }
  