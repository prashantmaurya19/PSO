package com.PlayChess.com.interfaces;

public interface CrudInterface<T, E> {
  public T create(T a);

  public T read(E a);

  public T update(T a);

  public T delete(E a);
}
