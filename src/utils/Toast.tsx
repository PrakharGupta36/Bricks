/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import "../css/toast.css";

type ToastProps = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success";
  duration?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type ToastActionElement = React.ReactElement<{
  altText: string;
}>;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const TOAST_LIMIT = 5;
const DEFAULT_TOAST_DURATION = 5000;

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (
  toastId: string,
  duration: number = DEFAULT_TOAST_DURATION
) => {
  if (toastTimeouts.has(toastId)) {
    clearTimeout(toastTimeouts.get(toastId));
    toastTimeouts.delete(toastId);
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, duration);

  toastTimeouts.set(toastId, timeout);
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId) {
        const toast = state.toasts.find((t) => t.id === toastId);
        if (toast) {
          addToRemoveQueue(toastId, toast.duration);
        }
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id, toast.duration);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, "id">;

export function toast({ duration = DEFAULT_TOAST_DURATION, ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      duration,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  // Auto-dismiss after duration
  if (duration !== Infinity) {
    setTimeout(() => {
      dismiss();
    }, duration);
  }

  return {
    id: id,
    dismiss,
    update,
  };
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export function ToastAction({
  altText,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  altText: string;
}) {
  return (
    <button className='toast-action' {...props}>
      <span className='sr-only'>{altText}</span>
      {children}
    </button>
  );
}

export function ToastClose({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className='toast-close' aria-label='Close' {...props}>
      <span aria-hidden='true'>×</span>
    </button>
  );
}

export function ToastTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className='toast-title' {...props} />;
}

export function ToastDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className='toast-description' {...props} />;
}

export function Toast({
  id,
  title,
  description,
  action,
  variant = "default",
  duration = DEFAULT_TOAST_DURATION,
  open: openProp,
  onOpenChange,
  ...props
}: ToastProps) {
  const [open, setOpen] = React.useState(openProp);

  React.useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    onOpenChange?.(open);
  };

  return (
    <div
      data-open={open ? "true" : "false"}
      data-variant={variant}
      className={`toast ${
        open ? "toast-open" : "toast-closed"
      } toast-${variant}`}
      {...props}
    >
      <div className='toast-content'>
        {title && <ToastTitle>{title}</ToastTitle>}
        {description && <ToastDescription>{description}</ToastDescription>}
      </div>
      {action && <div className='toast-action-wrapper'>{action}</div>}
      <ToastClose onClick={() => handleOpenChange(false)} />
    </div>
  );
}

export function Toaster() {
  const { toasts } = useToast();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className='toaster'>
      {toasts.map(({ id, title, description, action, ...props }, index) => (
        <div
          key={id}
          className='toast-stacked'
          style={{ zIndex: TOAST_LIMIT - index }}
        >
          <Toast
            id={id}
            title={title}
            description={description}
            action={action}
            {...props}
          />
        </div>
      ))}
    </div>
  );
}
