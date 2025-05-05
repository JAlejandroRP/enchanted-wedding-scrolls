
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await signIn(loginEmail, loginPassword);
      
      if (error) throw error;
      
      // Redirect to dashboard on successful login
      navigate('/dashboard');
      
    } catch (error: any) {
      console.error('Login error:', error.message);
      
      toast({
        title: "Error de inicio de sesión",
        description: error.message || "No se pudo iniciar sesión. Verifica tus credenciales.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerEmail || !registerPassword || !registerConfirmPassword || !fullName) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive"
      });
      return;
    }

    if (registerPassword.length < 6) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await signUp(registerEmail, registerPassword, fullName);
      
      if (error) throw error;
      
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada. Inicia sesión para continuar.",
      });
      
      // Reset form and switch to login tab
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterConfirmPassword('');
      setFullName('');
      
      // Set focus to login tab
      const loginTab = document.getElementById('login-tab');
      if (loginTab) {
        (loginTab as HTMLButtonElement).click();
      }
      
    } catch (error: any) {
      console.error('Registration error:', error.message);
      
      toast({
        title: "Error de registro",
        description: error.message || "No se pudo completar el registro. Intenta con otro correo.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#E5E0D8] to-white p-4">
      <div className="w-full max-w-md">
        <Card className="border-[#3E000C]/10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-playfair text-[#3E000C]">Invitaciones de Boda</CardTitle>
            <CardDescription>
              Crea invitaciones personalizadas para tu boda
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger id="login-tab" value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="tu@correo.com" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Contraseña</Label>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full text-white" 
                    style={{ backgroundColor: '#3E000C' }}
                    disabled={loading}
                  >
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nombre Completo</Label>
                    <Input 
                      id="fullName" 
                      type="text" 
                      placeholder="Juan Pérez" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Correo Electrónico</Label>
                    <Input 
                      id="registerEmail" 
                      type="email" 
                      placeholder="tu@correo.com" 
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Contraseña</Label>
                    <Input 
                      id="registerPassword" 
                      type="password" 
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full text-white" 
                    style={{ backgroundColor: '#3E000C' }}
                    disabled={loading}
                  >
                    {loading ? 'Registrando...' : 'Registrarse'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
        
        <div className="text-center mt-4">
          <Button variant="link" onClick={() => navigate('/')}>
            Volver a la página principal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
