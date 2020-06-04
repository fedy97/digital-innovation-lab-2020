
package it.css.util;

import it.css.util.itf.ExternalCallComponent;

public abstract class ExternalCallComponentAbstract<I, S, O, T> implements ExternalCallComponent<I, O> {

    @Override
    public O execute(I input) throws Exception {

        S inputService = mapFromInputToInputService(input);
        T outputService = invokeService(inputService);
        return mapFromOutputServiceToOutput(outputService);
    }

    public abstract S mapFromInputToInputService(I input);

    public abstract T invokeService(S input) throws Exception;

    public abstract O mapFromOutputServiceToOutput(T outPutService);

}
