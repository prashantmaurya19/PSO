package com.PlayChess.com.util;

public class StringUtil {
  public static String join(String... a) {
    if (a.length < 1) return "";
    StringBuilder res = new StringBuilder(a[0]);
    for (int i = 1; i < a.length - 1; i++) {
      res.append(a[i] + " ");
    }
    res.append(a[a.length - 1]);
    return res.toString();
  }
}
