'use client'

import { useBoardStore } from '@/store/BoardStorefullangel';
import { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import Column from './Column';

function Board() {

    const [board, getBoard, setBoardState] = useBoardStore((state) => [state.board, state.getBoard, state.setBoardState,]);

    useEffect(() => {
        getBoard();
    }, [getBoard]);
    
    const handleOnDragEnd = (result: DropResult ) => {
        const { destination, source, type } = result;

        // Comprobar que el usuario arrastro la carta fuera del tablero
        if(!destination) return;

        // Handle column drag
        if (type === 'column'){
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(source.index, 1);
            entries.splice(destination.index, 0, removed);
            const rearrangedColumns = new Map(entries);
            setBoardState({...board, columns: rearrangedColumns,
            });
        }


        //this step id needed as the indexes are stored as numbers 0,1,2 etc. instead of id's with DND library
        const columns = Array.from(board.columns);
        const startColIndex = columns[Number(source.droppableId)];
        const finishColIndex = columns[Number(destination.droppableId)];

        //TODO: Revisar estas constantes por presentar error al mover las cards de lugar
        const startCol: Column = {
            id: startColIndex?.[0] ?? '',
            todos:startColIndex?.[1].todos ?? [],
        };
        const finishCol: Column = {
            id: finishColIndex?.[0] ?? '',
            todos: finishColIndex[1].todos,
        };

        if(!startCol || !finishCol) return;

        if(source.index === destination.index && startCol === finishCol) return;

        const newTodos = startCol.todos;
        const [todoMoved] = newTodos.splice(source.index, 1);

        if(startCol.id === finishCol.id){
            //Si se arrasta en la misma columna
            newTodos.splice(destination.index, 0, todoMoved);
            const newCol={
                id: startCol.id,
                todos:newTodos,
            };
            const newColumns = new Map(board.columns);
            newColumns.set(startCol.id, newCol);

            setBoardState({ ...board, columns: newColumns });
        } else {
            //Si se arrasta entre columnas
            const finishTodos = Array.from(finishCol.todos);
            finishTodos.splice(destination.index, 0, todoMoved);

            const newColumns = new Map(board.columns);
            const newCol={
                id: startCol.id,
                todos:newTodos,
            };

            newColumns.set(startCol.id, newCol);
            newColumns.set(finishCol.id, {
                id: finishCol.id,
                todos: finishTodos,
            });

            //Actualizacion de la bd
            setBoardState({ ...board, columns: newColumns });
        }
    };

    return ( 
        <DragDropContext onDragEnd={ handleOnDragEnd }>
            <Droppable droppableId="board" direction="horizontal" type='column'>
                {(provided) => (
                    <div
                    className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {Array.from(board.columns.entries()).map(([id, column], index) =>(
                            <Column 
                            key={id}
                            id={id}
                            todos={column.todos}
                            index={index}
                            />
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default Board