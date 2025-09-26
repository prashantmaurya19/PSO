package com.PlayChess.com.ViewService.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RedirectController {

  // Matches any single-level or multi-level path (e.g., /home, /settings/profile)
  // The "forward:/" will internally redirect the request to the root mapping.
  @GetMapping("/")
  public String forwardToRoot() {
    return "forward:/index.html";
  }

  // The request for "/" will automatically serve index.html from the static folder
}
