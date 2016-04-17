<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/26/14
 * Time: 3:23 PM
 */

namespace Bux\Admin\HomeBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class NewAdministratorFormType
 *
 * @package Bux\Admin\HomeBundle\Form\Type
 */
class NewAdministratorFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('email', 'email', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('fullName', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('country', 'country', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('plainPassword', 'repeated', array(
                'type'              => 'password',
                'options'           => array('translation_domain' => 'FOSUserBundle'),
                'first_options'     => array('label' => 'form.password'),
                'second_options'    => array('label' => 'form.password_confirmation'),
                'invalid_message'   => 'fos_user.password.mismatch',
            ))
            ->add('adminPermission', new AdminPermissionsFormType());
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\UserBundle\Entity\User',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'admin_new_administrator_form_type';
    }
}