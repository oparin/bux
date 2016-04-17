<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/6/15
 * Time: 4:11 PM
 */

namespace Bux\Admin\SetupBundle\Form\Type\PaymentGateways;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class PayeerFormType
 *
 * @package Bux\Admin\SetupBundle\Form\Type\PaymentGateways
 */
class PayeerFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('shopId', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('secretKey', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('currency', 'choice', array(
                'choices'   => array(
                    'USD'   => 'USD',
                    'EUR'   => 'EUR'
                )
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\Admin\SetupBundle\Entity\PaymentGateways\PayeerSettings',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'payeer_money_form_type';
    }
}