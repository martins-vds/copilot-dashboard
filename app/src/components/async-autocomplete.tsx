import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface AsyncAutocompleteProps {
    label: string;
    isOptionEqualToValue?: ((option: unknown, value: unknown) => boolean);
    getOptionLabel?: (option: unknown) => string;
    loadOptions: () => Promise<unknown[]>;
    onChange?: (event: React.ChangeEvent<unknown>, value: unknown) => void;
    onError?: (error: unknown) => void;
}

export default function AsyncAutocomplete({ label, isOptionEqualToValue, getOptionLabel, loadOptions, onChange, onError }: AsyncAutocompleteProps) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<unknown[]>([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            try {
                const newOptions = await loadOptions();
    
                if (active) {
                    setOptions([...newOptions]);
                }
            } catch (error) {
                if(onError) {
                    onError(error);
                }
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, loadOptions, onError]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onChange={onChange}
            isOptionEqualToValue={isOptionEqualToValue}
            getOptionLabel={getOptionLabel}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
}