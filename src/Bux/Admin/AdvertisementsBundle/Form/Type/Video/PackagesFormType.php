<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/12/15
 * Time: 10:10 AM
 */

namespace Bux\Admin\AdvertisementsBundle\Form\Type\Video;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class PackagesFormType
 *
 * @package Bux\Admin\AdvertisementsBundle\Form\Type\Video
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
            ->add('credits', 'integer', array(
            ))
            ->add('price', 'money', array(
                'currency'  => 'USD'
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\Admin\AdvertisementsBundle\Entity\VideoPackages',
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