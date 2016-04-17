<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/20/15
 * Time: 5:42 PM
 */

namespace Bux\UserBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * Class ProfileFormType
 *
 * @package Bux\UserBundle\Form\Type
 */
class ProfileFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        // add your custom field
        $builder
            ->remove('username')
            ->add('email', 'text', array(
                'required'  => true
            ))
            ->add('fullName', 'text', array(
            ))
            ->add('country', 'country', array(
            ))
            ->add('paymentAccounts', 'collection', array(
                'type'  => new UserPaymentAccountFormType(),
                'required'  => false
            ))
            ->add('plainPassword', 'repeated', array(
                'type' => 'password',
                'options' => array('translation_domain' => 'FOSUserBundle'),
                'first_options' => array(
                    'label' => 'form.password',
                ),
                'second_options' => array('label' => 'form.password_confirmation'),
                'invalid_message' => 'fos_user.password.mismatch',
                'required'  => false
            ));


    }

    /**
     * @return null|string|\Symfony\Component\Form\FormTypeInterface
     */
    public function getParent()
    {
        return 'fos_user_profile';
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'bux_user_edit_profile';
    }
}