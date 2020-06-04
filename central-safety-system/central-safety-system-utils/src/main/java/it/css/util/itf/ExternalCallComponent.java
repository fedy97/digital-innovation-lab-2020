
package it.css.util.itf;

public interface ExternalCallComponent<I, O> {

    public O execute(I input) throws Exception;
}
