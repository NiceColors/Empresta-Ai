type User = {
    email?: string;
    name?: string;
    permissions?: string[];
    role?: string[];
}

interface IUserProps {
    role: 'INTERN' | 'MANAGER';
    id: number;
    name: string;
    email: string;
    cpf: string;
    birthdate: string;
    created_at: string;
    updated_at: string;
}