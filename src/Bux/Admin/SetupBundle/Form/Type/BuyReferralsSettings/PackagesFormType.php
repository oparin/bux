<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/3/15
 * Time: 1:24 PM
 */

namespace Bux\Admin\SetupBundle\Form\Type\BuyReferralsSettings;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class PackagesFormType
 *
 * @package Bux\Admin\SetupBundle\Form\Type\BuyReferralsSettings
 */
class PackagesFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('referrals', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('price', 'money', array(
                'constraints'   => array(
                    new NotBlank()
                ),
                'currency'  => 'USD'
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\Admin\SetupBundle\Entity\BuyReferralsSettingsPackages',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'packages_form_type';
    }
}